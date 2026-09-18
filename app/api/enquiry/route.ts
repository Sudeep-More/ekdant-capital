import { NextResponse } from "next/server";

/**
 * Lead capture for the hero form. The browser never sees the sheet endpoint —
 * it posts here, and this handler forwards to the Apps Script web app bound to
 * the enquiry spreadsheet.
 */

type Payload = {
  product?: unknown;
  name?: unknown;
  phone?: unknown;
  city?: unknown;
  consent?: unknown;
};

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Same rules the form enforces, re-checked here: the client can be bypassed. */
function validate(body: Payload) {
  const name = str(body.name);
  const phone = str(body.phone).replace(/[\s-]+/g, "");
  const city = str(body.city);
  const product = str(body.product);

  if (name.length < 2) return { error: "Enter a name." };
  if (!/^(\+91)?[6-9]\d{9}$/.test(phone))
    return { error: "Enter a 10-digit Indian mobile number." };
  if (city.length < 2) return { error: "Enter a city." };
  if (body.consent !== true) return { error: "Consent is required." };

  return {
    lead: {
      name,
      // Stored uniformly as 10 digits, however it was typed.
      phone: phone.replace(/^\+91/, ""),
      city,
      product: product || "Not specified",
    },
  };
}

function reference() {
  const year = new Date().getFullYear();
  const serial = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  return `EK-${year}-${serial}`;
}

export async function POST(request: Request) {
  const endpoint = process.env.SHEETS_WEBHOOK_URL;
  if (!endpoint) {
    console.error("SHEETS_WEBHOOK_URL is not set — enquiry dropped.");
    return NextResponse.json(
      { error: "Enquiries are not accepting submissions right now." },
      { status: 503 },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const checked = validate(body);
  if ("error" in checked) {
    return NextResponse.json({ error: checked.error }, { status: 400 });
  }

  const record = {
    ...checked.lead,
    reference: reference(),
    submittedAt: new Date().toISOString(),
    token: process.env.SHEETS_WEBHOOK_TOKEN ?? "",
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      // Apps Script is occasionally slow to wake; don't hang the visitor.
      signal: AbortSignal.timeout(10000),
    });

    // Apps Script answers 302 → script.googleusercontent.com, which fetch
    // follows, so a non-OK status here is a genuine failure.
    if (!response.ok) {
      console.error("Sheet webhook failed", response.status, await response.text());
      return NextResponse.json(
        { error: "We could not record your enquiry. Please call us instead." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Sheet webhook unreachable", error);
    return NextResponse.json(
      { error: "We could not record your enquiry. Please call us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reference: record.reference });
}

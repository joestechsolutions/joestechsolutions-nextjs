import type { Metadata } from "next";
import { isAdminSession } from "./auth";
import { LoginForm } from "./LoginForm";
import { PaymentLinksView } from "./PaymentLinksView";
import { EMAIL_TEMPLATES, PAYMENT_LINKS, QUICK_REFERENCE } from "./data";

export const metadata: Metadata = {
  title: "Payment Links | Admin",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

// Internal tool. The gate runs on the server: the links, templates and
// internal pricing are only rendered once the session cookie checks out, so
// none of it reaches a logged-out browser.
export default async function PaymentLinksAdmin() {
  if (!(await isAdminSession())) return <LoginForm />;
  return (
    <PaymentLinksView links={PAYMENT_LINKS} templates={EMAIL_TEMPLATES} quickReference={QUICK_REFERENCE} />
  );
}

// @ts-nocheck
import React from 'react';

export function TermsOfServicePage() {
  const today = new Date().toLocaleDateString('en-GB');
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 lg:px-8">
      <h1 className="text-2xl font-display mb-6">Royal Kalmar Air Force – Terms of Service</h1>
      <section className="space-y-4">
        <h2 className="font-mono text-xl">Acceptance of Terms</h2>
        <p className="font-mono text-sm">
          By registering and using this platform you agree to abide by the rules and conduct outlined herein.
        </p>

        <h2 className="font-mono text-xl">Account Conduct</h2>
        <ul className="list-disc ml-6 font-mono text-sm space-y-1">
          <li>Maintain professional conduct</li>
          <li>Avoid impersonation</li>
          <li>Avoid harassment</li>
          <li>Avoid uploading illegal content</li>
        </ul>

        <h2 className="font-mono text-xl">Role Authority</h2>
        <p className="font-mono text-sm">
          Administrators have full moderation authority including reviewing logs and managing accounts.
        </p>

        <h2 className="font-mono text-xl">Account Termination</h2>
        <p className="font-mono text-sm">
          Admins may suspend, demote or delete accounts for violation of policies.
        </p>

        <h2 className="font-mono text-xl">Content Ownership</h2>
        <p className="font-mono text-sm">
          All posted content becomes part of the RKAF Secure Command Network simulation system.
        </p>

        <h2 className="font-mono text-xl">No Real Military Affiliation Disclaimer</h2>
        <p className="font-mono text-sm">
          This is a fictional simulation unless otherwise adapted by the user. It is not affiliated with any real military organization.
        </p>

        <h2 className="font-mono text-xl">Limitation of Liability</h2>
        <p className="font-mono text-sm">
          The platform is provided "as is" with no warranties. Use at your own risk.
        </p>
      </section>
      <footer className="mt-12 font-mono text-xs text-[#6B7280]">
        Effective Date: {today}
      </footer>
    </div>
  );
}

// @ts-nocheck
import React from 'react';

export function PrivacyPolicyPage() {
  const today = new Date().toLocaleDateString('en-GB');
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 lg:px-8">
      <h1 className="text-2xl font-display mb-6">Royal Kalmar Air Force – Privacy Policy</h1>
      <section className="space-y-4">
        <h2 className="font-mono text-xl">Introduction</h2>
        <p className="font-mono text-sm">
          The Secure Command Network is a simulated internal communication system used for training and coordination within the Royal Kalmar Air Force. This
          policy outlines how personal data is handled within the platform.
        </p>

        <h2 className="font-mono text-xl">Data Collected</h2>
        <ul className="list-disc ml-6 font-mono text-sm space-y-1">
          <li>Username</li>
          <li>Display name</li>
          <li>Email</li>
          <li>Rank</li>
          <li>Messages</li>
          <li>Media uploads</li>
          <li>Activity logs</li>
        </ul>

        <h2 className="font-mono text-xl">Data Storage</h2>
        <p className="font-mono text-sm">
          All information is stored locally in your browser's storage (LocalStorage/IndexedDB). No data is transmitted to external servers unless you deliberately
          export or import state. Users are responsible for securing their own devices.
        </p>

        <h2 className="font-mono text-xl">Administrative Oversight</h2>
        <p className="font-mono text-sm">
          Administrators can view logs, delete content, and assign roles as part of operational oversight within the simulation. This ensures compliance with
          training protocols and simulated operational security.
        </p>

        <h2 className="font-mono text-xl">Security Notice</h2>
        <p className="font-mono text-sm">
          This platform simulates secure communication but does not replace real military-grade encryption. Treat the system as a training environment.
        </p>

        <h2 className="font-mono text-xl">User Responsibility</h2>
        <p className="font-mono text-sm">
          Do not upload or share sensitive real-world data. The system is provided for simulation and training purposes only.
        </p>
      </section>
      <footer className="mt-12 font-mono text-xs text-[#6B7280]">
        Last Updated: {today}
      </footer>
    </div>
  );
}

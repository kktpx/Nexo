"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/providers/DataProvider";
import { APPLICATION_STATUSES, ApplicationStatus } from "@/types/application";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ArrowLeft } from "lucide-react";
import { nowISO } from "@/lib/utils/date";

export default function NewApplicationPage() {
  const router = useRouter();
  const { addApplication } = useData();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split("T")[0]);
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("wishlist");
  const [jobDescription, setJobDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !position.trim()) {
      setError("Company and Position are required.");
      return;
    }

    // Since addApplication generates the ID, we can't easily redirect to the new ID here 
    // without changing addApplication to return the ID. Let's just update `DataProvider` 
    // or we can redirect back to `/applications`. I will redirect to `/applications`.
    
    addApplication({
      company,
      position,
      jobUrl,
      location,
      salary,
      applicationDate: applicationDate ? new Date(applicationDate).toISOString() : nowISO(),
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      status,
      jobDescription,
      notes,
    });
    
    router.push("/applications");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">New Application</h1>
          <p className="mt-1 text-sm text-gray-500">Track a new job or internship opportunity.</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">{error}</div>}
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input label="Company *" value={company} onChange={e => setCompany(e.target.value)} autoFocus />
            <Input label="Position *" value={position} onChange={e => setPosition(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input label="Location" value={location} onChange={e => setLocation(e.target.value)} />
            <Input label="Salary / Allowance" value={salary} onChange={e => setSalary(e.target.value)} placeholder="e.g. $100k - $120k" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Input label="Application Date" type="date" value={applicationDate} onChange={e => setApplicationDate(e.target.value)} />
            <Input label="Deadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
            <Select 
              label="Status" 
              value={status} 
              onChange={e => setStatus(e.target.value as ApplicationStatus)}
              options={APPLICATION_STATUSES.map(s => ({ value: s.value, label: s.label }))}
            />
          </div>

          <Input label="Job URL" type="url" value={jobUrl} onChange={e => setJobUrl(e.target.value)} placeholder="https://..." />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
            <textarea
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-48 font-mono text-sm"
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" variant="primary">Save Application</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

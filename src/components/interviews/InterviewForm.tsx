import React, { useState, useEffect } from "react";
import { Interview, INTERVIEW_TYPES, InterviewType, InterviewStatus } from "@/types/interview";
import { Application } from "@/types/application";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";

interface InterviewFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: Omit<Interview, "id" | "createdAt" | "updatedAt">) => void;
  applications: Application[];
  initialData?: Interview | null;
}

export function InterviewForm({ open, onClose, onSubmit, applications, initialData }: InterviewFormProps) {
  const [applicationId, setApplicationId] = useState("");
  const [type, setType] = useState<InterviewType>("hr-interview");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [stage, setStage] = useState(1);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<InterviewStatus>("upcoming");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setApplicationId(initialData.applicationId);
      setType(initialData.type);
      setDate(initialData.date.split("T")[0]);
      setTime(initialData.time);
      setMeetingUrl(initialData.meetingUrl || "");
      setStage(initialData.stage);
      setNotes(initialData.notes);
      setStatus(initialData.status);
    } else {
      setApplicationId("");
      setType("hr-interview");
      setDate("");
      setTime("");
      setMeetingUrl("");
      setStage(1);
      setNotes("");
      setStatus("upcoming");
    }
    setError("");
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationId) {
      setError("Please select an application.");
      return;
    }
    if (!date || !time) {
      setError("Date and time are required.");
      return;
    }

    const app = applications.find(a => a.id === applicationId);
    if (!app) return;

    onSubmit({
      applicationId,
      company: app.company,
      position: app.position,
      type,
      date: new Date(date).toISOString(),
      time,
      meetingUrl,
      stage,
      notes,
      status
    });
    onClose();
  };

  const appOptions = applications.map(a => ({
    value: a.id,
    label: `${a.company} - ${a.position}`
  }));

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit Interview" : "Schedule Interview"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        
        <Select
          label="Application *"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          options={[{ value: "", label: "Select an application" }, ...appOptions]}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Interview Type"
            value={type}
            onChange={(e) => setType(e.target.value as InterviewType)}
            options={INTERVIEW_TYPES}
          />
          <Input 
            label="Stage / Round" 
            type="number" 
            min="1" 
            value={stage} 
            onChange={(e) => setStage(parseInt(e.target.value))} 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Date *" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input label="Time *" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <Input label="Meeting URL" type="url" value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} placeholder="https://..." />
        
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as InterviewStatus)}
          options={[
            { value: "upcoming", label: "Upcoming" },
            { value: "completed", label: "Completed" },
            { value: "cancelled", label: "Cancelled" }
          ]}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Instructions</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save Interview</Button>
        </div>
      </form>
    </Modal>
  );
}

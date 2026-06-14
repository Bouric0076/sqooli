import React, { use, useEffect, useState } from 'react';
import './SubmittedList.css'; // Make sure to import the CSS file
import { useSpinnerStore } from '@/app/store/useSpinnerStore';
import { getAllAssignmentSubmissions, getAssignment, getAssignmentSubmissions } from '@/app/lib/assignment';
import { Assignment } from '../page';

// Defined the shape of a single exam submission
export interface ExamSubmission {
    id: string;
    assignment: Assignment;
    submittedAt: string;
    score: number;
    status: string;
    feedback?: string;
}

interface Typeprops {
    type: string;
    // You could also pass the list as a prop if you fetch it from an API:
    // items?: ExamSubmission[];
}



export const SubmittedList = ({ type }: Typeprops) => {


    const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
    const { loading, setLoading } = useSpinnerStore();
    
    const fetchSubmissions = async () => {
        try{
            setLoading(true);
            // Simulate an API call
            var data =   await getAllAssignmentSubmissions(type);
            console.log("Fetched submissions:", data);
            setSubmissions(data.data || []); // Assuming the API response has a 'data' field containing the submissions
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

useEffect(() => {
        fetchSubmissions();
    }, [type]);


    return (
        <div className="submitted-list-container">
            {submissions.length === 0 && !loading && (
                <p className="text-gray-500 py-4">No submissions found.</p>
            ) }
            {submissions?.map((item) => (
                <div key={item?.id} className="submitted-item">
                    <div className="submitted-item-content">
                        <h3 className="submitted-item-title">{item?.assignment?.title} {item?.feedback && <span className={`submitted-item-badge ${item?.status === 'Pass' ? 'badge-pass' : 'badge-fail'}`}>{item?.feedback}</span>}  </h3>
                        <div className="submitted-item-details">
                            <span className="submitted-item-date">{item?.submittedAt}</span>
                            <span className={`submitted-item-badge ${item?.status === 'Pass' ? 'badge-pass' : 'badge-fail'}`}>
                                {item?.status}
                            </span>
                        </div>
                    </div>
                    <div className="submitted-item-icon">
                        {/* Right Chevron Icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    );
}


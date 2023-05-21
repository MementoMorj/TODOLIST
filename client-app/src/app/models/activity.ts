export interface Activity {
    id: string;
    taskName: string;
    dataOfCreation: Date | null;
    dateOfExperation: Date | null;
    taskDescription: string;
    taskStatus: string;
}
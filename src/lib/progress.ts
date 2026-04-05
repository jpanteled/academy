// src/lib/progress.ts
import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

export type LessonProgress = {
  studentId: string;
  lessonId: string;
  subject: string;
  unit: string;
  teks: string;
  score: number;
  totalQuestions: number;
  completedAt?: unknown;
};

export async function saveLessonProgress(data: LessonProgress) {
  try {
    const docId = `${data.studentId}_${data.lessonId}`;
    await setDoc(doc(db, "lessonProgress", docId), {
      ...data,
      completedAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error("Error saving progress:", err);
    return false;
  }
}

export async function getLessonProgress(studentId: string, lessonId: string) {
  try {
    const docId = `${studentId}_${lessonId}`;
    const snap = await getDoc(doc(db, "lessonProgress", docId));
    return snap.exists() ? snap.data() as LessonProgress : null;
  } catch (err) {
    console.error("Error getting progress:", err);
    return null;
  }
}
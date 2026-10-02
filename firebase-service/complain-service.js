import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

import { firestoreDb } from "../Components/Firebase/Config";


// Create Complaint
export async function createComplain(complain) {
  console.log("Saving complaint:", complain);

  const docRef = await addDoc(
    collection(firestoreDb, "complains"),
    complain
  );

  console.log("Saved with ID:", docRef.id);

  return docRef;
}


// Get complaints of logged-in user
export async function listComplain(email) {
  console.log("Searching complaints for:", email);

  const q = query(
    collection(firestoreDb, "complains"),
    where("createdBy", "==", email)
  );

  const snapshot = await getDocs(q);

  console.log("Documents found:", snapshot.size);

  const list = [];

  snapshot.forEach((doc) => {
    list.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return list;
}


// Get all complaints (Admin)
export async function listAllComplaints() {

  console.log("Fetching all complaints...");

  const snapshot = await getDocs(
    collection(firestoreDb, "complains")
  );

  const list = [];

  snapshot.forEach((doc) => {

    list.push({
      id: doc.id,
      ...doc.data(),
    });

  });

  console.log("All complaints:", list);

  return list;
}


// Update complaint status (Admin)
export async function updateComplaintStatus(id, status) {

  console.log("Updating complaint:", id, status);

  const complaintRef = doc(
    firestoreDb,
    "complains",
    id
  );

  await updateDoc(complaintRef, {
    status: status,
  });

  console.log("Status updated successfully");
}
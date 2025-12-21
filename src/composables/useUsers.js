// useUsers.js - Vue composable for admin user management
import { ref, onUnmounted } from 'vue';
import { db } from '../firebase';
import { collection, doc, getDoc, onSnapshot, orderBy, updateDoc, query } from 'firebase/firestore';

export function useUsers() {
  const users = ref([]);
  let unsubscribe = null;

  function subscribe() {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    unsubscribe = onSnapshot(q, (snap) => {
      users.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    });
  }

  async function toggleApproved(id) {
    const snap = await getDoc(doc(db, 'users', id));
    const u = snap.data();
    await updateDoc(doc(db, 'users', id), { approved: !u.approved });
  }

  async function toggleAdmin(id) {
    const snap = await getDoc(doc(db, 'users', id));
    const u = snap.data();
    await updateDoc(doc(db, 'users', id), { isAdmin: !u.isAdmin });
  }

  onUnmounted(() => unsubscribe && unsubscribe());

  return {
    users,
    subscribe,
    toggleApproved,
    toggleAdmin,
  };
}

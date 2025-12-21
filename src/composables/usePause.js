import { ref, onUnmounted } from 'vue';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';

export function usePause() {
  const pauseEnd = ref(null);
  const isPaused = ref(false);
  let unsub = null;

  function subscribe() {
    unsub = onSnapshot(doc(db, 'partyStatus', 'current'), (snap) => {
      const s = snap.data() || {};
      pauseEnd.value = s.pauseEnd || null;
      isPaused.value = !!s.pauseEnd && (!s.pauseEnd || new Date(s.pauseEnd) > new Date());
    });
  }

  async function setPauseEnd(endTime) {
    await updateDoc(doc(db, 'partyStatus', 'current'), {
      pauseEnd: endTime,
      updatedAt: serverTimestamp(),
    });
  }

  async function clearPause() {
    await updateDoc(doc(db, 'partyStatus', 'current'), {
      pauseEnd: null,
      updatedAt: serverTimestamp(),
    });
  }

  onUnmounted(() => unsub && unsub());

  return {
    pauseEnd,
    isPaused,
    subscribe,
    setPauseEnd,
    clearPause,
  };
}

import { ref, onUnmounted } from 'vue';
import { db } from '../firebase';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';

export function useStatus() {
  const currentGameId = ref(null);
  const currentGameTitle = ref('(none)');
  let unsub = null;

  async function resolveGameTitle(gameId) {
    if (!gameId) return '(none)';
    const snap = await getDoc(doc(db, 'games', gameId));
    return snap.exists() ? snap.data().title : '(unknown)';
  }

  function subscribe() {
    unsub = onSnapshot(doc(db, 'partyStatus', 'current'), async (snap) => {
      const s = snap.data() || {};
      currentGameId.value = s.currentGameId || null;
      currentGameTitle.value = await resolveGameTitle(s.currentGameId);
    });
  }

  onUnmounted(() => unsub && unsub());

  return {
    currentGameId,
    currentGameTitle,
    subscribe,
  };
}

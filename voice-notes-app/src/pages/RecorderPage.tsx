import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RecorderModal from '../components/note/RecorderModal';

export default function RecorderPage() {
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const handleCreateNote = useCallback((transcript: string) => {
    navigate('/note/new', { state: { transcript } });
  }, [navigate]);

  return (
    <RecorderModal onClose={handleClose} onCreateNote={handleCreateNote} />
  );
}

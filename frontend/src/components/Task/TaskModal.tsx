import { useState } from "react";
import { createTask } from "../../lib/services/operations/task.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onTaskCreated: () => void;
}

const CreateTaskModal = ({
  isOpen,
  onClose,
  projectId,
  onTaskCreated,
}: CreateTaskModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      setLoading(true);
      dispatch(createTask({ name: title, projectId }));
      onTaskCreated();
      onClose();
      setTitle("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute z-20 inset-0" onClick={onClose}></div>
      <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-2xl z-30">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border text-gray-600 border-gray-400 hover:bg-gray-100"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;

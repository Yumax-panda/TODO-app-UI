import axios from "axios";

import { Task } from "../../../types/task";

export interface EditModalProps {
  onClose: () => void;
  id: string;
}

export const EditModal: React.FC<EditModalProps> = ({ onClose, id }) => {
  return <>test</>;
};

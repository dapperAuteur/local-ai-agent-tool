'use client';

import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';
import RightPanel from '@/components/layout/RightPanel';
import Modal from '@/components/ui/Modal';
import NewAgentForm from '@/components/agent/NewAgentForm';
import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const isNewAgentModalOpen = useAppStore((state) => state.isNewAgentModalOpen);
  const closeNewAgentModal = useAppStore((state) => state.closeNewAgentModal);
  return (
    <>
      <div className="flex h-screen bg-gray-800 text-white">
        <div className="flex w-full min-w-[1088px]">
          <Sidebar />
          <MainContent />
          <RightPanel />
        </div>
      </div>

      <Modal
        isOpen={isNewAgentModalOpen}
        onClose={closeNewAgentModal}
        title="Create New AI Agent"
      >
        <NewAgentForm />
      </Modal>
    </>
  );
}
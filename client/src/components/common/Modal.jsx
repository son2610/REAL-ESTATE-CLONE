import { useAppStore } from "~/store/useAppStore";

function Modal() {
    const { contentModal, setModal } = useAppStore();
    return (
        <div
            onClick={() => setModal(false, null)}
            className="absolute top-0 left-0 h-screen w-screen z-[100] bg-overlay-50 flex items-center justify-center"
        >
            {contentModal}
        </div>
    );
}

export default Modal;

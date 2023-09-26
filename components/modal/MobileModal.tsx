'use client';
import { PanInfo, Variants, motion, useDragControls } from 'framer-motion';
import React, { useContext, useRef, useState } from 'react';
import { ModalContext } from './ModalContext';

interface MobileModalProps {
  children: React.ReactNode;
  windowSize: { width: number | undefined; height: number | undefined };
}

export function MobileModal({ windowSize, children }: MobileModalProps) {
  const { show, hide } = useContext(ModalContext);
  const variants: Variants = {
    hidden: {
      y: '100%',
    },
    visible: {
      y: 0,
    },
  };

  const constraintsRef = useRef(null);

  const ref = useRef<HTMLDivElement>(null);
  async function handleDragEnd(event: any, info: PanInfo) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    const modalHeight = ref.current?.getBoundingClientRect().height || 0;
    if (offset > modalHeight / 4 || velocity > 300) {
      hide();
    }
  }

  const [allowDrag, setAllowDrag] = useState(true);
  const dragControls = useDragControls();

  const onDragStart = (event: any, info: any) => {
    if (!event.target.classList.contains('drag')) {
      console.log('SHOULD NOT DRAG');

      (dragControls as any).componentControls.forEach((entry: any) => {
        entry.stop(event, info);
      });
    } else {
      console.log('SHOULD DRAG');
      dragControls.start(event);
    }
  };

  return (
    <div>
      {/* <div
        className="bg-red-500 w-full h-8 z-10 absolute top-8"
        onPointerDown={(e: any) => {
          startDrag(e);
        }}
      /> */}
      <motion.div
        ref={ref}
        id="mobile-modal"
        variants={variants}
        initial="hidden"
        animate={'visible'}
        exit="hidden"
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 w-full overflow-scroll rounded-t-lg border border-b-0 bg-background"
        style={{
          maxHeight: windowSize.height! + 20,
          boxShadow: `0 -1px 10px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`,
        }}
        drag="y"
        dragDirectionLock
        onDragStart={(event: any, info: PanInfo) => {
          console.log('ID: ', event.target?.id);
          if (event.target?.id !== 'modal-header') {
            (dragControls as any).componentControls.forEach((entry: any) => {
              entry.stop(event, info);
            });
          }
        }}
        dragListener={true}
        dragControls={dragControls}
        // onPointerDown={onDragStart}
        onDragEnd={handleDragEnd}
        dragElastic={{ top: 0, bottom: 1 }}
        dragConstraints={{ top: 0, bottom: 0 }}
      >
        <MobileHandleBar />
        {children}
      </motion.div>
    </div>
  );
}

export default MobileModal;

const MobileHandleBar = () => (
  <div className="pointer-events-none relative top-2 z-10 mx-auto -mb-1 h-1 w-9 rounded-full bg-muted-foreground/20" />
);

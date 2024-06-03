"use client"

import {ActionTooltip } from "@/components/action-tooltip"
import { useModal } from "@/hooks/use-modal-store"

import { Plus } from 'lucide-react'
import React from 'react'

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
        <ActionTooltip
          side="right"
          align="center"
          label="Add a server"
        >
            <button
            onClick={() => onOpen("createServer")}
            className='group flex items-center'
            >
                <div className='flex items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 mx-3 h-[48px] w-[48px] rounded-[24px] overflow-hidden'>
                    <Plus 
                    className='group-hover:text-white transition text-emerald-500'
                    size={25}
                    />
                </div>
            </button>
        </ActionTooltip>
    </div>
  )
}

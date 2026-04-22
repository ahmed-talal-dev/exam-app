import { Button } from '@/components/ui/button'
import React from 'react'

export default function designSystem() {
    return (
        <div className="space-y-8 p-10">
            {/* Section title */}
            <h2 className="font-mono text-xl font-semibold">
                Buttons
            </h2>

            {/* Button variants */}
            <div className="flex flex-wrap gap-4">
                <Button>Primary</Button>

                <Button variant="default">
                    default
                </Button>

                <Button variant="disabled">
                    disabled
                </Button>

                <Button variant="secondary">
                    secondary
                </Button>

                <Button variant="destructive">
                    destructive
                </Button>
                <Button variant="variant8">
                    variant8
                </Button>
                <Button variant="link">
                    link
                </Button>
            </div>
        </div>


    )
}

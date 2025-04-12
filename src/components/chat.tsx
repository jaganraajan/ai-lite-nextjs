'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconArrowUp } from './ui/icons';

const Chat: React.FC = () => {
    return (
        <div className="group w-full overflow-auto ">
            <div className="fixed inset-x-0 bottom-10 w-full ">
                <div className="w-full max-w-xl mx-auto">
                <Card className="p-2">
                    <form onSubmit={() => console.log('test submit')}>
                    <div className="flex">
                        <Input
                        type="text"
                        value={"test"}
                        onChange={event => {
                            console.log(event.target.value);
                        }}
                        className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                        placeholder='Ask me anything...'
                        />
                        <Button >
                        <IconArrowUp />
                        </Button>
                    </div>
                    </form>
                </Card>
                </div>
            </div>
        </div>
    );
};

export default Chat;
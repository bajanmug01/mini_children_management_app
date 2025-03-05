'use client';

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { api } from "LA/trpc/react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "LA/components/ui/dialog";
import { Button } from "LA/components/ui/button";

interface ChildProps {
    id: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
}

const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

export function ChildListItem({ id, firstName, middleName, lastName, dateOfBirth, gender }: ChildProps) {
    const age = calculateAge(dateOfBirth);

    const utils = api.useContext();
    const deleteChildMutation = api.child.delete.useMutation({
        onSuccess: () => {
            utils.child.getAll.invalidate();
        },
    });

    const handleConfirmDelete = async () => {
        try {
            await deleteChildMutation.mutateAsync({ id });
        } catch (error) {
            console.error("Failed to delete child", error);
        }
    };

    return (
        <li className="p-5 hover:bg-gray-100 transition">
            <div className="flex items-center">
                {/* Clickable area for navigation */}
                <Link href={`/child/${id}`} className="flex flex-1 items-center">
                    {/* Left: Name */}
                    <div className="w-64 truncate">
                        <p className="text-sm font-semibold text-gray-900">
                            {firstName} {middleName && `${middleName} `}{lastName}
                        </p>
                    </div>
                    {/* Center: Age and Gender side-by-side */}
                    <div className="flex gap-4">
                        <p className="text-xs text-gray-500">{age} years old</p>
                        <p className="text-xs text-gray-500">{gender}</p>
                    </div>
                    {/* Right inside Link: Chevron aligned with ml-auto */}
                    <div className="flex items-center ml-auto">
                        <ChevronRightIcon className="w-6 h-6 text-gray-400" />
                    </div>
                </Link>
                {/* Remove button outside the Link but in the same row */}
                <div className="ml-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="destructive"
                                type="button"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Remove
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Deletion</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this child? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex justify-end gap-2">
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    variant="destructive"
                                    type="button"
                                    onClick={handleConfirmDelete}
                                >
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </li>
    );
}

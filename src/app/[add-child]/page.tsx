'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { Button } from 'LA/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from 'LA/components/ui/card';
import { Input } from 'LA/components/ui/input';
import { Label } from 'LA/components/ui/label';
import { api } from 'LA/trpc/react';

interface GuardianFormData {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone?: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
}

interface ChildFormData {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    notes?: string;
    guardians: GuardianFormData[];
}

{/* Validierung mit infos welche Felder ausgefüllt werden müssen fehlt und fehlermeldungen */ }
export default function AddChildPage() {
    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<ChildFormData>({
        defaultValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            dateOfBirth: dayjs().format('YYYY-MM-DD'),
            gender: '',
            notes: '',
            guardians: [
                {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    street: '',
                    city: '',
                    zipCode: '',
                    country: ''
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'guardians',
    });

    const createChildMutation = api.child.create.useMutation();

    const onSubmit = async (data: ChildFormData) => {
        try {
            await createChildMutation.mutateAsync(data);
            router.push('/');
        } catch (error) {
            console.error("Failed to create child:", error);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Add Children</h2>
                    <p className="text-sm text-gray-500">
                        Here you can add a kindergarten child along with their personal details.
                    </p>
                </div>
                <Button variant="outline" type="button" onClick={() => router.push('/')}>
                    cancel
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Child Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center">
                            <Label htmlFor="firstName" className="w-40 font-semibold text-gray-900">First Name:</Label>
                            <Input
                                id="firstName"
                                {...register('firstName', { required: 'First name is required' })}
                                className="flex-1"
                            />
                            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="middleName" className="w-40 font-semibold text-gray-900">Middle Name:</Label>
                            <Input id="middleName" {...register('middleName')} className="flex-1" />
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="lastName" className="w-40 font-semibold text-gray-900">Last Name:</Label>
                            <Input
                                id="lastName"
                                {...register('lastName', { required: 'Last name is required' })}
                                className="flex-1"
                            />
                            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="dateOfBirth" className="w-40 font-semibold text-gray-900">Date of Birth:</Label>
                            <Input
                                type="date"
                                id="dateOfBirth"
                                {...register('dateOfBirth', { required: 'Date of birth is required' })}
                                className="flex-1"
                            />
                            {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="gender" className="w-40 font-semibold text-gray-900">Gender:</Label>
                            <Input
                                id="gender"
                                {...register('gender', { required: 'Gender is required' })}
                                className="flex-1"
                            />
                            {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="notes" className="w-40 font-semibold text-gray-900">Notes:</Label>
                            <Input id="notes" {...register('notes')} className="flex-1" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Guardian Information</CardTitle>
                        <p className="text-sm text-gray-500">At least one guardian is required.</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="border p-4 rounded-md space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Guardian {index + 1}</h3>
                                <div className="flex items-center">
                                    <Label htmlFor={`guardians.${index}.firstName`} className="w-40 font-semibold text-gray-900">
                                        First Name:
                                    </Label>
                                    <Input
                                        id={`guardians.${index}.firstName`}
                                        {...register(`guardians.${index}.firstName` as const, { required: 'First name is required' })}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Label htmlFor={`guardians.${index}.middleName`} className="w-40 font-semibold text-gray-900">
                                        Middle Name:
                                    </Label>
                                    <Input
                                        id={`guardians.${index}.middleName`}
                                        {...register(`guardians.${index}.middleName` as const)}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Label htmlFor={`guardians.${index}.lastName`} className="w-40 font-semibold text-gray-900">
                                        Last Name:
                                    </Label>
                                    <Input
                                        id={`guardians.${index}.lastName`}
                                        {...register(`guardians.${index}.lastName` as const, { required: 'Last name is required' })}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Label htmlFor={`guardians.${index}.email`} className="w-40 font-semibold text-gray-900">
                                        Email:
                                    </Label>
                                    <Input
                                        id={`guardians.${index}.email`}
                                        {...register(`guardians.${index}.email` as const, { required: 'Email is required' })}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Label htmlFor={`guardians.${index}.phone`} className="w-40 font-semibold text-gray-900">
                                        Phone:
                                    </Label>
                                    <Input
                                        id={`guardians.${index}.phone`}
                                        {...register(`guardians.${index}.phone` as const)}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Label htmlFor={`guardians.${index}.street`} className="w-40 font-semibold text-gray-900">
                                        Street:
                                    </Label>
                                    <Input
                                        id={`guardians.${index}.street`}
                                        {...register(`guardians.${index}.street` as const, { required: 'Street is required' })}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Label htmlFor={`guardians.${index}.city`} className="w-40 font-semibold text-gray-900">
                                        City:
                                    </Label>
                                    <Input
                                        id={`guardians.${index}.city`}
                                        {...register(`guardians.${index}.city` as const, { required: 'City is required' })}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Label htmlFor={`guardians.${index}.zipCode`} className="w-40 font-semibold text-gray-900">
                                        Zip Code:
                                    </Label>
                                    <Input
                                        id={`guardians.${index}.zipCode`}
                                        {...register(`guardians.${index}.zipCode` as const, { required: 'Zip Code is required' })}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Label htmlFor={`guardians.${index}.country`} className="w-40 font-semibold text-gray-900">
                                        Country:
                                    </Label>
                                    <Input
                                        id={`guardians.${index}.country`}
                                        {...register(`guardians.${index}.country` as const, { required: 'Country is required' })}
                                        className="flex-1"
                                    />
                                </div>
                                {fields.length > 1 && (
                                    <div className="flex justify-end">
                                        <Button variant="destructive" type="button" onClick={() => remove(index)}>
                                            Remove Guardian
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <Button type="button" onClick={() => append({
                                firstName: '',
                                middleName: '',
                                lastName: '',
                                email: '',
                                phone: '',
                                street: '',
                                city: '',
                                zipCode: '',
                                country: ''
                            })}>
                                Add Guardian
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-between">
                    <Button type="submit">Add Child</Button>
                </div>
            </form>
        </main>
    );
}

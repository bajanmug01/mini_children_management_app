'use client';

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { Button } from "LA/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "LA/components/ui/card";
import { Input } from "LA/components/ui/input";
import { Label } from "LA/components/ui/label";

// Data Interfaces
interface Guardian {
    id: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    email: string;
    phone?: string | null;
    street: string;
    city: string;
    zipCode: string;
    country: string;
}

interface Child {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    notes: string;
    guardians: Guardian[];
}

// Form Data Interfaces
interface ChildFormData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    notes: string;
}

interface GuardianFormData {
    firstName: string;
    middleName?: string | null;
    lastName: string;
    email: string;
    phone?: string | null;
    street: string;
    city: string;
    zipCode: string;
    country: string;
}

// Component Props Interfaces
interface ChildCardProps {
    child: Child;
    labelWidthClass: string;
}

interface GuardianCardProps {
    guardian: Guardian;
    labelWidthClass: string;
}

// ChildCard Component
function ChildCard({ child, labelWidthClass }: ChildCardProps) {
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChildFormData>({
        defaultValues: {
            firstName: child.firstName,
            lastName: child.lastName,
            dateOfBirth: new Date(child.dateOfBirth).toISOString().slice(0, 10), // YYYY-MM-DD
            gender: child.gender,
            notes: child.notes,
        },
    });

    const onSubmit = (data: ChildFormData) => {
        console.log("Updated child:", data);
        // Optionally update your data source/API here.
        setIsEditing(false);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <div className="flex flex-col items-start">
                    <CardTitle className="text-left">Child Information</CardTitle>
                    <CardDescription className="text-left">
                        Personal details and notes
                    </CardDescription>
                </div>
                {!isEditing && (
                    <div className="flex items-center">
                        <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex items-center">
                            <Label
                                htmlFor="firstName"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                First Name:
                            </Label>
                            <Input
                                id="firstName"
                                {...register("firstName", { required: "First name is required" })}
                                className="flex-1"
                            />
                            {errors.firstName && (
                                <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="lastName"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Last Name:
                            </Label>
                            <Input
                                id="lastName"
                                {...register("lastName", { required: "Last name is required" })}
                                className="flex-1"
                            />
                            {errors.lastName && (
                                <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="dateOfBirth"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Date of Birth:
                            </Label>
                            <Input
                                type="date"
                                id="dateOfBirth"
                                {...register("dateOfBirth", { required: "Date of birth is required" })}
                                className="flex-1"
                            />
                            {errors.dateOfBirth && (
                                <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="gender"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Gender:
                            </Label>
                            <Input
                                id="gender"
                                {...register("gender", { required: "Gender is required" })}
                                className="flex-1"
                            />
                            {errors.gender && (
                                <span className="text-red-500 text-sm">{errors.gender.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="notes"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Notes:
                            </Label>
                            <Input id="notes" {...register("notes")} className="flex-1" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-3">
                        <div className="flex">
                            <div className={`${labelWidthClass} font-semibold text-gray-900`}>Full Name:</div>
                            <div className="text-gray-700">
                                {child.firstName} {child.lastName}
                            </div>
                        </div>
                        <div className="flex">
                            <div className={`${labelWidthClass} font-semibold text-gray-900`}>Date of Birth:</div>
                            <div className="text-gray-700">
                                {dayjs(child.dateOfBirth).format("MM/DD/YYYY")}
                            </div>
                        </div>
                        <div className="flex">
                            <div className={`${labelWidthClass} font-semibold text-gray-900`}>Gender:</div>
                            <div className="text-gray-700">{child.gender}</div>
                        </div>
                        <div className="flex">
                            <div className={`${labelWidthClass} font-semibold text-gray-900`}>Notes:</div>
                            <div className="text-gray-700">{child.notes}</div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// GuardianCard Component
function GuardianCard({ guardian, labelWidthClass }: GuardianCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GuardianFormData>({
        defaultValues: {
            firstName: guardian.firstName,
            middleName: guardian.middleName,
            lastName: guardian.lastName,
            email: guardian.email,
            phone: guardian.phone,
            street: guardian.street,
            city: guardian.city,
            zipCode: guardian.zipCode,
            country: guardian.country,
        },
    });

    const onSubmit = (data: GuardianFormData) => {
        console.log("Updated guardian:", data);
        // Optionally update your data source/API here.
        setIsEditing(false);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <div className="flex flex-col items-start">
                    <CardTitle>
                        Guardian: {guardian.firstName} {guardian.lastName}
                    </CardTitle>
                    <CardDescription>Contact and address details</CardDescription>
                </div>
                {!isEditing && (
                    <div className="flex items-center">
                        <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex items-center">
                            <Label
                                htmlFor="firstName"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                First Name:
                            </Label>
                            <Input
                                id="firstName"
                                {...register("firstName", { required: "First name is required" })}
                                className="flex-1"
                            />
                            {errors.firstName && (
                                <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="middleName"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Middle Name:
                            </Label>
                            <Input id="middleName" {...register("middleName")} className="flex-1" />
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="lastName"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Last Name:
                            </Label>
                            <Input
                                id="lastName"
                                {...register("lastName", { required: "Last name is required" })}
                                className="flex-1"
                            />
                            {errors.lastName && (
                                <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="email"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Email:
                            </Label>
                            <Input
                                id="email"
                                {...register("email", { required: "Email is required" })}
                                className="flex-1"
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="phone"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Phone:
                            </Label>
                            <Input id="phone" {...register("phone")} className="flex-1" />
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="street"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Street:
                            </Label>
                            <Input
                                id="street"
                                {...register("street", { required: "Street is required" })}
                                className="flex-1"
                            />
                            {errors.street && (
                                <span className="text-red-500 text-sm">{errors.street.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="city"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                City:
                            </Label>
                            <Input
                                id="city"
                                {...register("city", { required: "City is required" })}
                                className="flex-1"
                            />
                            {errors.city && (
                                <span className="text-red-500 text-sm">{errors.city.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="zipCode"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Zip Code:
                            </Label>
                            <Input
                                id="zipCode"
                                {...register("zipCode", { required: "Zip Code is required" })}
                                className="flex-1"
                            />
                            {errors.zipCode && (
                                <span className="text-red-500 text-sm">{errors.zipCode.message}</span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label
                                htmlFor="country"
                                className={`${labelWidthClass} font-semibold text-gray-900`}
                            >
                                Country:
                            </Label>
                            <Input
                                id="country"
                                {...register("country", { required: "Country is required" })}
                                className="flex-1"
                            />
                            {errors.country && (
                                <span className="text-red-500 text-sm">{errors.country.message}</span>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-3">
                        <div className="flex">
                            <div className={`${labelWidthClass} font-semibold text-gray-900`}>
                                Full Name:
                            </div>
                            <div className="text-gray-700">
                                {guardian.firstName}{" "}
                                {guardian.middleName ? `${guardian.middleName} ` : ""}
                                {guardian.lastName}
                            </div>
                        </div>
                        <div className="flex">
                            <div className={`${labelWidthClass} font-semibold text-gray-900`}>
                                Email:
                            </div>
                            <div className="text-gray-700">{guardian.email}</div>
                        </div>
                        <div className="flex">
                            <div className={`${labelWidthClass} font-semibold text-gray-900`}>
                                Phone:
                            </div>
                            <div className="text-gray-700">{guardian.phone || "N/A"}</div>
                        </div>
                        <div className="flex">
                            <div className={`${labelWidthClass} font-semibold text-gray-900`}>
                                Address:
                            </div>
                            <div className="text-gray-700">
                                {guardian.street}, {guardian.city}, {guardian.zipCode},{" "}
                                {guardian.country}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Main Page Component
export default function ChildDetailsPage() {
    // Mock child data including guardians
    const child: Child = {
        id: "1",
        firstName: "Margot",
        lastName: "Foster",
        dateOfBirth: "2005-06-15T00:00:00.000Z",
        gender: "Female",
        notes:
            "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.",
        guardians: [
            {
                id: "g1",
                firstName: "John",
                middleName: "D.",
                lastName: "Foster",
                email: "john.foster@example.com",
                phone: "123-456-7890",
                street: "123 Main St",
                city: "New York",
                zipCode: "10001",
                country: "USA",
            },
            {
                id: "g2",
                firstName: "Jane",
                middleName: null,
                lastName: "Foster",
                email: "jane.foster@example.com",
                phone: null,
                street: "123 Main St",
                city: "New York",
                zipCode: "10001",
                country: "USA",
            },
        ],
    };

    // Fixed label width for alignment
    const labelWidthClass = "w-40";

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-6">
            {/* Render the ChildCard */}
            <ChildCard child={child} labelWidthClass={labelWidthClass} />

            {/* Render GuardianCards */}
            <div className="space-y-4">
                {child.guardians.map((guardian) => (
                    <GuardianCard key={guardian.id} guardian={guardian} labelWidthClass={labelWidthClass} />
                ))}
            </div>
        </div>
    );
}

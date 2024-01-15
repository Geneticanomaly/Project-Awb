export function calculateAge(dob_day: number, dob_month: number, dob_year: number) {
    // Calculate user's age based on date of birth
    const currentDate = new Date();
    const birthDate = new Date(dob_year, dob_month - 1, dob_day);

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

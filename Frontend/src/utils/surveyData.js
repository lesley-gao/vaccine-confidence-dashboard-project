const data = [
    { "surveyYear": 2023, "surveyQuestion": "Vaccines are important for children.", "agree_percent": 80 },
    { "surveyYear": 2023, "surveyQuestion": "Vaccines are safe.", "agree_percent": 76 },
    { "surveyYear": 2023, "surveyQuestion": "Vaccines are effective.", "agree_percent": 78 },
    { "surveyYear": 2023, "surveyQuestion": "Vaccines are compatible with my beliefs.", "agree_percent": 74 },
    { "surveyYear": 2022, "surveyQuestion": "Vaccines are important for children.", "agree_percent": 83 },
    { "surveyYear": 2022, "surveyQuestion": "Vaccines are safe.", "agree_percent": 81 },
    { "surveyYear": 2022, "surveyQuestion": "Vaccines are effective.", "agree_percent": 83 },
    { "surveyYear": 2022, "surveyQuestion": "Vaccines are compatible with my beliefs.", "agree_percent": 68 },
    { "surveyYear": 2018, "surveyQuestion": "Vaccines are important for children.", "agree_percent": 84 },
    { "surveyYear": 2018, "surveyQuestion": "Vaccines are safe.", "agree_percent": 69 },
    { "surveyYear": 2018, "surveyQuestion": "Vaccines are effective.", "agree_percent": 79 },
    { "surveyYear": 2018, "surveyQuestion": "Vaccines are compatible with my beliefs.", "agree_percent": null }
]

const demographicData = {
    "2023": {
        "Vaccines are important for children.": {
            "Age": {
                "18-24": 78,
                "25-34": 71,
                "35-44": 70,
                "45-54": 78,
                "55+": 89,
                "Don't know/ Refused": 0
            },
            "Education": {
                "Don't know/ Refused": 40,
                "Primary and below": 57,
                "Secondary and Vocational": 75,
                "University and above": 85
            },
            "Gender": {
                "Male": 80,
                "Female": 79,
                "Other": 100,
                "Don't know/ Prefer not to say": 0
            },
            "Religion": {
                "Atheist/agnostic": 82,
                "Buddhist": 92,
                "Christian": 79,
                "Don't know/ Refused": 71,
                "Hindu": 78,
                "Jewish": 50,
                "Muslim": 86,
                "Other": 66
            }
        },
        "Vaccines are safe.": {
            "Age": {
                "18-24": 72,
                "25-34": 73,
                "35-44": 68,
                "45-54": 68,
                "55+": 84,
                "Don't know/ Refused": 100
            },
            "Education": {
                "Don't know/ Refused": 60,
                "Primary and below": 62,
                "Secondary and Vocational": 71,
                "University and above": 80
            },
            "Gender": {
                "Male": 75,
                "Female": 76,
                "Other": 100,
                "Don't know/ Prefer not to say": 100
            },
            "Religion": {
                "Atheist/agnostic": 79,
                "Buddhist": 100,
                "Christian": 73,
                "Don't know/ Refused": 71,
                "Hindu": 72,
                "Jewish": 50,
                "Muslim": 71,
                "Other": 63
            }
        },
        "Vaccines are effective.": {
            "Age": {
                "18-24": 75,
                "25-34": 66,
                "35-44": 73,
                "45-54": 72,
                "55+": 89,
                "Don't know/ Refused": 100
            },
            "Education": {
                "Don't know/ Refused": 40,
                "Primary and below": 62,
                "Secondary and Vocational": 73,
                "University and above": 82
            },
            "Gender": {
                "Male": 78,
                "Female": 77,
                "Other": 100,
                "Don't know/ Prefer not to say": 100
            },
            "Religion": {
                "Atheist/agnostic": 79,
                "Buddhist": 92,
                "Christian": 77,
                "Don't know/ Refused": 71,
                "Hindu": 75,
                "Jewish": 100,
                "Muslim": 71,
                "Other": 66
            }
        },
        "Vaccines are compatible with my beliefs.": {
            "Age": {
                "18-24": 68,
                "25-34": 69,
                "35-44": 68,
                "45-54": 70,
                "55+": 82,
                "Don't know/ Refused": 100
            },
            "Education": {
                "Don't know/ Refused": 40,
                "Primary and below": 57,
                "Secondary and Vocational": 67,
                "University and above": 81
            },
            "Gender": {
                "Male": 76,
                "Female": 72,
                "Other": 100,
                "Don't know/ Prefer not to say": 100
            },
            "Religion": {
                "Atheist/agnostic": 72,
                "Buddhist": 83,
                "Christian": 78,
                "Don't know/ Refused": 61,
                "Hindu": 81,
                "Jewish": 50,
                "Muslim": 71,
                "Other": 61
            }
        }
    },
    "2018": {
        "Vaccines are important for children.": {
            "Age": {
                "18-24": 76,
                "25-34": 84,
                "35-44": 91,
                "45-54": 79,
                "55-64": 86,
                "65+": 90
            },
            "Education": {
                "Primary and below": 82,
                "Secondary and Vocational": 83,
                "University and above": 87
            },
            "Gender": {
                "Male": 86,
                "Female": 82
            },
            "Religion": {
                "Muslim": 100,
                "Christian": 84,
                "Atheist/agnostic": 85,
                "Buddhist": 100,
                "Hindu": 71,
                "Other": 78
            }
        },
        "Vaccines are safe.": {
            "Age": {
                "18-24": 65,
                "25-34": 63,
                "35-44": 82,
                "45-54": 63,
                "55-64": 68,
                "65+": 76
            },
            "Education": {
                "Primary and below": 61,
                "Secondary and Vocational": 68,
                "University and above": 76
            },
            "Gender": {
                "Male": 72,
                "Female": 67
            },
            "Religion": {
                "Muslim": 71,
                "Christian": 69,
                "Atheist/agnostic": 70,
                "Buddhist": 100,
                "Hindu": 64,
                "Other": 69
            }
        },
        "Vaccines are effective.": {
            "Age": {
                "18-24": 82,
                "25-34": 71,
                "35-44": 85,
                "45-54": 72,
                "55-64": 81,
                "65+": 83
            },
            "Education": {
                "Primary and below": 72,
                "Secondary and Vocational": 79,
                "University and above": 84
            },
            "Gender": {
                "Male": 83,
                "Female": 76
            },
            "Religion": {
                "Muslim": 42,
                "Christian": 80,
                "Atheist/agnostic": 81,
                "Buddhist": 100,
                "Hindu": 71,
                "Other": 68
            }
        },
        "Vaccines are compatible with my beliefs.": {
            "Age": {
                "18-24": null,
                "25-34": null,
                "35-44": null,
                "45-54": null,
                "55-64": null,
                "65+": null
            },
            "Education": {
                "Primary and below": null,
                "Secondary and Vocational": null,
                "University and above": null
            },
            "Gender": {
                "Male": null,
                "Female": null
            },
            "Religion": {
                "Muslim": null,
                "Christian": null,
                "Atheist/agnostic": null,
                "Buddhist": null,
                "Hindu": null,
                "Other": null
            }
        }
    }
};
export { data, demographicData };
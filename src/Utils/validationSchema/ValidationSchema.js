import * as yup from "yup";
import { isPhoneValid } from "../helperFunctions/helperfunctions";

const arabicNamePattern =
  /^([\u0621-\u064A]+) ([\u0621-\u064A]+) ([\u0621-\u064A]+) ([\u0621-\u064A]+)[ ]?$/;

const englishNamePattern =
  /^([A-Za-z]+) ([A-Za-z]+) ([A-Za-z]+) ([A-Za-z]+)[ ]?$/;

const namePattern =
  /^[\u0621-\u064AA-Za-z]+ [\u0621-\u064AA-Za-z]+ [\u0621-\u064AA-Za-z]+[ ]?$/;

const nameFourPartPattern =
  /^([\u0621-\u064AA-Za-z]+) ([\u0621-\u064AA-Za-z]+) ([\u0621-\u064AA-Za-z]+) ([\u0621-\u064AA-Za-z]+)[ ]?$/;

export const scholarshipSchema = () =>
  yup.object().shape({
    full_name_ar: yup
      .string()
      .required("common:field_required")
      .test("full_name_ar", "common:nameValidation", (value) => {
        return value?.match(arabicNamePattern);
      }),
    full_name_en: yup
      .string()
      .required("common:field_required")
      .test("full_name_en", "common:nameValidation", (value) => {
        return value?.match(englishNamePattern);
      }),
    father_full_name_ar: yup
      .string()
      .required("common:field_required")
      .test("father_full_name_ar", "common:nameValidation", (value) => {
        return value?.match(arabicNamePattern);
      }),
    father_full_name_en: yup
      .string()
      .required("common:field_required")
      .test("father_full_name_en", "common:nameValidation", (value) => {
        return value?.match(englishNamePattern);
      }),
    national_number: yup
      .string()
      .required("common:field_required")
      .matches(/^[0-9]+$/, "common:englishNumbersOnly")
      .length(10, "common:nationalNumberErr"),
    mobile: yup
      .string()
      .required("common:field_required")
      .test("phone_valid", "common:phone_valid", (value) =>
        isPhoneValid(value)
      ),
    mobile2: yup
      .string()
      .required("common:field_required")
      .test("phone_valid", "common:phone_valid", (value) => isPhoneValid(value))
      .test("phoneError", "common:phoneError", function (value) {
        const mobile1 = this.parent.mobile?.replace("+", "");
        const mobile2 = value?.replace("+", "");

        return mobile1 !== mobile2;
      }),
    city: yup
      .object()
      .nullable()
      .required("common:field_required")
      .test("common:field_required", (value) => {
        return value?.id;
      }),
    region: yup
      .object()
      .nullable()
      .required("common:field_required")
      .test("common:field_required", (value) => {
        return value?.id;
      }),
    otherDocument: yup.object().nullable().required("common:field_required"),
    studentDocument: yup.object().nullable().required("common:field_required"),
    guardianDocument: yup.object().nullable().required("common:field_required"),
  });

export const RegistrationInformationSchema = () =>
  yup.object().shape({
    full_name: yup
      .string()
      .required("common:Name_required")
      .test("full_name", "common:nameValidation", (value) => {
        return value?.match(namePattern);
      }),

    mobile: yup
      .string()
      .required("common:phone_required")
      .test("phone_valid", "common:phone_valid", (value) =>
        isPhoneValid(value)
      ),
  });
export const AdditionalInformationSchema = yup.object().shape({
  Image: yup.object().nullable().required("common:Image_required"),
  city: yup
    .object()
    .nullable()
    .required("common:field_required")
    .test("city", "common:field_required", (value) => {
      return value?.id;
    }),
  region: yup
    .object()
    .nullable()
    .required("common:field_required")
    .test("region", "common:field_required", (value) => {
      return value?.id;
    }),
  language: yup
    .object()
    .nullable()
    .required("common:field_required")
    .test("language", "common:field_required", (value) => {
      return value?.id;
    }),
  academicYear: yup
    .object()
    .nullable()
    .required("common:field_required")
    .test("academicYear", "common:field_required", (value) => {
      return value?.id;
    }),
  Program: yup
    .object()
    .nullable()
    .required("common:field_required")
    .test("program", "common:field_required", (value) => {
      return value?.id;
    }),
  curentFirstLevel: yup
    .object()
    .nullable()
    .required("common:field_required")
    .test("firstLevel", "common:field_required", (value) => {
      return value?.id;
    }),
});

export const DeliveryInformationSchema = (
  primaryMobileRef,
  secondaryMobileRef
) =>
  yup.object().shape({
    name: yup
      .string()
      .nullable()
      .required("common:Name_required")
      .test("full_name", "common:nameValidation", (value) => {
        return value?.match(nameFourPartPattern);
      }),
    address: yup
      .string()
      .nullable()
      .required("common:Address_details_required"),

    city: yup
      .object()
      .nullable()
      .required("common:City_required")
      .test("common:field_required", (value) => value?.id),
    region: yup
      .object()
      .nullable()
      .required("common:field_required")
      .test("common:field_required", (value) => value?.id),
    primary_mobile: yup
      .string()
      .nullable()
      .required("common:field_required")
      .test("phone_valid", "common:phone_valid", (value) => isPhoneValid(value))
      .test(
        "phoneError",
        "common:phoneError",
        (value) => value !== secondaryMobileRef?.current?.state?.value
      ),
    secondary_mobile: yup
      .string()
      .nullable()
      .required("common:field_required")
      .test("phone_valid", "common:phone_valid", (value) => isPhoneValid(value))
      .test(
        "phoneError",
        "common:phoneError",
        (value) => value !== primaryMobileRef?.current?.state?.value
      ),
  });
export const ChangePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("common:password_error3")
    .min(8, "common:password_error1")
    .test("passwords-match", "common:passwords_match2", function (value) {
      return this.parent.oldPassword !== value;
    }),
  oldPassword: yup.string().required("common:password_error3"),
  password_confirmation: yup
    .string()
    .required("common:passwords_match")
    .test("passwords-match", "common:passwords_match", function (value) {
      return this.parent.password === value;
    }),
});
export const DeleteAccountScema = () =>
  yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("common:email_validat")
      .required("common:Email_required"),
    password: yup.string().required("common:password_error3"),
    mobile: yup
      .string()
      .required("common:phone_required")
      .test("phone_valid", "common:phone_valid", (value) =>
        isPhoneValid(value)
      ),
  });

export const signinValidationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("common:email_validat")
      .required("common:Email_required"),

    password: yup
      .string()
      .min(3, "common:password_error1")
      .max(15, "common:password_error2")
      .required("common:password_error3"),
  });

export const signupValidationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("common:email_validat")
      .required("common:Email_required"),
    full_name: yup
      .string()
      .required("common:Name_required")
      .test("full_name", "common:nameValidation", (value) => {
        return value?.match(namePattern);
      }),
    user_name: yup.string().required("common:Name_required"),
    password: yup
      .string()
      .min(8, () => "common:password_error1")
      .max(15, "common:password_error2")
      .required("common:password_error3"),
    password_confirmation: yup
      .string()
      .required("common:passwords_match")
      .test("passwords-match", "common:passwords_match", function (value) {
        return this.parent.password === value;
      }),

    mobile: yup
      .string()
      .required("common:phone_required")
      .test("phone_valid", "common:phone_valid", (value) =>
        isPhoneValid(value)
      ),
  });

export const loginMobileValidationSchema = () =>
  yup.object().shape({
    phoneNumber: yup
      .string()
      .required("common:phone_required")
      .test("phone_valid", "common:phone_valid", (value) =>
        isPhoneValid(value)
      ),
  });

export const accountRecoveryValidationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("common:email_validat")
      .required("common:Email_required"),
    phoneNumber: yup
      .string()
      .required("common:phone_required")
      .test("phone_valid", "common:phone_valid", (value) =>
        isPhoneValid(value)
      ),
  });

export const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, () => "common:password_error1")
    .max(15, "common:password_error2")
    .required("common:password_error3"),
  password_confirmation: yup
    .string()
    .required("common:passwords_match")
    .test("passwords-match", "common:passwords_match", function (value) {
      return this.parent.password === value;
    }),
});
export const AverageCalculatordSchema = yup.object().shape({
  seventhGPA: yup.number().positive().required("common:field_required"),
  eighthGPA: yup.number().positive().required("common:field_required"),
  ninthGPA: yup.number().positive().required("common:field_required"),
});
export const createGroupValidationSchema = () =>
  yup.object().shape({
    groupName: yup.string().required("common:groupNameRequired"),
    groupDescription: yup.string().required("common:groupDescriptionRequired"),
    groupType: yup.object().required("common:groupTypeError"),
    coverImage: yup.object().required("common:coverImageRequired"),
    mainImage: yup.object().required("common:mainImageRequired"),
  });

export const createPostValidationSchema = () =>
  yup.object().shape({
    postText: yup.string().trim().required("common:field_required"),
    postImages: yup.array().max(15, "common:imageLimit"),
    postVideo: yup.array().max(1, "common:videoLimit"),
  });
export const FinancialRequestSchema = yup.object().shape({
  theAmount: yup.string().required("common:field_required"),
  IBANCLIQ: yup.string().required("common:field_required"),
  paymentMethod: yup.object().nullable().required("common:field_required"),
});

export const SallemAlrayValidationSchema = () =>
  yup.object().shape({
    courses: yup.array().of(
      yup.object().shape({
        id: yup.string(),
        name: yup.string().required("common:field_required"),
      })
    ),
    teachers: yup.array().of(
      yup.object().shape({
        id: yup.string(),
        name: yup.string().required("common:field_required"),
      })
    ),
    mobiles: yup.array().of(
      yup
        .string()
        .required("common:field_required")
        .test("phone_valid", "common:phone_valid", (value) =>
          isPhoneValid(value)
        )
        .test("Phone-match", "common:Phone_match", function (value) {
          const array = this.parent;
          let index = array.indexOf(value);
          if (index !== -1) {
            array.splice(index, 1);
          }
          return !array?.includes(value);
        })
    ),
  });
export const eventRegisterSchema = () =>
  yup.object().shape({
    full_name: yup
      .string()
      .required("common:Name_required")
      .test("full_name", "common:field_required", (value) => {
        return value?.match(namePattern);
      }),

    mobile: yup
      .string()
      .required("common:field_required")
      .test("phone_valid", "common:phone_valid", (value) =>
        isPhoneValid(value)
      ),

    program: yup
      .object()
      .nullable()
      .required("common:field_required")
      .test("common:field_required", (value) => {
        return value?.id;
      }),
    attendance: yup
      .object()
      .nullable()
      .required("common:field_required")
      .test("common:field_required", (value) => {
        return value?.id;
      }),
  });

export const eventGiftSchema = () =>
  yup.object().shape({
    full_name: yup
      .string()
      .required("common:Name_required")
      .test("full_name", "common:field_required", (value) => {
        return value?.match(namePattern);
      }),
   
    mobile: yup
      .string()
      .required("common:field_required")
      .test("phone_valid", "common:phone_valid", (value) =>
        isPhoneValid(value)
      ),
    teachers: yup.array().of(
      yup.object().shape({
        name: yup.string().required("common:field_required"),
      })
    ),
    subjects: yup.array().of(
      yup.object().shape({
        id: yup.string().required("common:field_required"),
      })
    ),
   
  });

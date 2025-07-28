// app/contact/actions.ts
// 'use server';

import emailjs from 'emailjs-com';

export async function handleFormSubmission(values: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  try {
    const templateParams = {
      full_name: values.name,
      email: values.email,
      phone: values.phone || "N/A",
      subject: values.subject,
      message: values.message,
    };

    const result = await emailjs.send(
      'service_dfqk98v',          // Your Service ID
      'template_s8ceint',         // Your Template ID
      templateParams,
      'MaoxCuXNwidoKbWxe'         // Your Public Key
    );

    return { success: true, result };
  } catch (error) {
    console.error('EmailJS error:', error);
    return { success: false, error };
  }
}

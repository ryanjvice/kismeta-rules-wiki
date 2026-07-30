/** Replace action with your provider's embed/post URL (Mailchimp, Buttondown, ConvertKit, etc.). */
export const mailingListConfig = {
	action: "https://buttondown.com/api/emails/embed-subscribe/goodmagikgames",
	method: "post" as const,
	emailFieldName: "email",
	/** Extra hidden fields some providers require (e.g. Buttondown's `embed=1`). */
	hiddenFields: [{ name: "embed", value: "1" }],
};

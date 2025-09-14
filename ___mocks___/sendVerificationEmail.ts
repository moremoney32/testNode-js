///Ce mock intercepte tous les appels à la fonction d’envoi d’email dans les tests pour ne pas appeler un vrai service d’envoi.

// export default jest.fn((email: string, code: string) => Promise.resolve());
const sendVerificationEmail = jest.fn();
export default sendVerificationEmail;
const documentPathTypes = Object.freeze({
	COVER_IMAGE: "coverImage",
	INVOICE: "invoice",
	GALLERY: '2d-gallery',
	GALLERY_3D: '3d-gallery',
	CERTIFICATE: 'doc/certificate/',
	MARK_PROOFS: 'markProofs'
})

const documentTypes = Object.freeze([
	{
		name: "Cover Image",
		path: documentPathTypes.COVER_IMAGE,
	},
	{
		name: "Gallery",
		path: documentPathTypes.GALLERY,
	},
	{
		name: "Mark Proofs",
		path: documentPathTypes.MARK_PROOFS,
	},
	{
		name: "Invoice",
		path: documentPathTypes.INVOICE,
	},
	{
		name: "Certificate and other documents",
		path: documentPathTypes.CERTIFICATE,
	},
	{
		name: "3D Gallery",
		path: documentPathTypes.MARK_PROOFS,
	},
]);

const tokenStatuses = Object.freeze({
	LOADING: "LOADING",
	EMPTY: "EMPTY",
	EXIST: "EXIST"
})

const viewTokenTypes = Object.freeze({
	PUBLIC_TOKEN: "PUBLIC_TOKEN",
	SHARED_TOKEN: "SHARED_TOKEN",
})

export { documentTypes, documentPathTypes, tokenStatuses, viewTokenTypes };

export const teamMemberQuery = `*[_type == "teamMember"]{
  _id,
  name,
  position,
  bio,
  "imageUrl": image.asset->url
}`


export const projectQuery = `*[_type == "project"]{
    _id,
    name,
    title,
    image,
    "slug": slug.current
  }
`
export const serviceQuery = `*[_type == "service"]{
    _id,
    title,
    description,
    features,
    icon,
    "slug": slug.current
  }
`

export const landParcelQuery = `*[_type == "landParcel"]{
    _id,
    name,
    location,
    address,
    price,
    priceFormatted,
    description,
    shortDescription,
    size,
    sizeFormatted,
    landUse,
    topography,
    status,
    featured,
    investmentSuitable,
    features,
    infrastructure,
    images,
    videoUrl,
    documentationType,
    "slug": slug.current
  }
`

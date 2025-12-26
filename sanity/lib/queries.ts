export const teamMemberQuery = `*[_type == "teamMember"]{
  _id,
  name,
  position,
  bio,
  image{
    asset->{
      _id,
      url
    }
  },
  social
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
    icon
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
    images[]{
      asset->{
        _id,
        url
      }
    },
    videoUrl,
    documentationType,
    "slug": slug.current
  }
`

export const landParcelBySlugQuery = `*[_type == "landParcel" && slug.current == $slug][0]{
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
    images[]{
      asset->{
        _id,
        url
      }
    },
    videoUrl,
    documentationType,
    "slug": slug.current
  }
`

export const investmentQuery = `*[_type == "investment"]{
    _id,
    name,
    type,
    minInvestment,
    minInvestmentFormatted,
    expectedROI,
    duration,
    location,
    description,
    shortDescription,
    benefits,
    requirements,
    faqs,
    images[]{
      asset->{
        _id,
        url
      }
    },
    status,
    "slug": slug.current
  }
`

export const investmentBySlugQuery = `*[_type == "investment" && slug.current == $slug][0]{
    _id,
    name,
    type,
    minInvestment,
    minInvestmentFormatted,
    expectedROI,
    duration,
    location,
    description,
    shortDescription,
    benefits,
    requirements,
    faqs,
    images[]{
      asset->{
        _id,
        url
      }
    },
    status,
    "slug": slug.current
  }
`

export const featuredLandParcelsQuery = `*[_type == "landParcel" && featured == true]{
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
    images[]{
      asset->{
        _id,
        url
      }
    },
    videoUrl,
    documentationType,
    "slug": slug.current
  }
`

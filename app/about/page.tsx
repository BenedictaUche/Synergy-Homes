import {AboutContent} from "@/components/client/about-content";
import { sanityFetch } from "@/sanity/lib/live"
import { teamMemberQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

export default async function AboutPage() {
  const { data: teamMembers } = await sanityFetch({query: teamMemberQuery});

  // Transform team member images to URLs
  const transformedTeamMembers = (teamMembers || []).map((member: any) => ({
    ...member,
    imageUrl: member.image?.asset ? urlFor(member.image.asset).url() : "/placeholder.svg"
  }));

  return <AboutContent teamMembers={transformedTeamMembers} />
}

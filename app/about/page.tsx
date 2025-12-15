import {AboutContent} from "@/components/client/about-content";
import { sanityFetch } from "@/sanity/lib/live"
import { teamMemberQuery } from "@/sanity/lib/queries"

export default async function AboutPage() {
  const { data: teamMembers } = await sanityFetch({query: teamMemberQuery});

  return <AboutContent teamMembers={teamMembers} />
}

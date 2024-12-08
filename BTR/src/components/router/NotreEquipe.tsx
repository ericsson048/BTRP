import  { useState, useEffect } from 'react';
import axios from 'axios';
import TeamMember from "../TeamMember";

interface TeamMemberData {
  id: number;
  name: string;
  title: string;
  image_url: string;
  facebook: string;
  github: string;
  instagram: string;
}

interface Responsibility {
  id: number;
  team_member_id: number;
  responsibility: string;
}

function NotreEquipe() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);
  const [responsibilities, setResponsibilities] = useState<Responsibility[]>([]);

  useEffect(() => {
    fetchTeamMembers();
    fetchResponsibilities();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3500/team');
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const fetchResponsibilities = async () => {
    try {
      const response = await axios.get('http://localhost:3500/responsibilities');
      setResponsibilities(response.data);
    } catch (error) {
      console.error('Error fetching responsibilities:', error);
    }
  };

  const getMemberResponsibilities = (memberId: number) => {
    return responsibilities
      .filter(r => r.team_member_id === memberId)
      .map(r => r.responsibility);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-300/25">
      <div className="flex flex-col justify-center gap-3 items-center w-[600px] p-4 max-md:w-full">
        <h1 className="text-4xl font-extrabold text-primary">Notre équipe</h1>
        <p className="text-xl text-center text-gray-500">
          Notre équipe est composée de personnes passionnées et expérimentées qui travaillent
          ensemble pour atteindre nos objectifs.
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 py-4 px-0 min-[769px]:px-24">
        {teamMembers.map((member) => (
          <TeamMember
            key={member.id}
            name={member.name}
            title={member.title}
            imageUrl={member.image_url}
            socialLinks={{
              facebook: member.facebook,
              github: member.github,
              instagram: member.instagram
            }}
            responsibilities={getMemberResponsibilities(member.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default NotreEquipe;
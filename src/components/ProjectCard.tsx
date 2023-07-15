interface IProjectCard {
    teamId: number,
    teamName: string,
    teamImage: string,
    teamDescription: string,
    teamStar: number,
}

function ProjectCard({teamId, teamName, teamImage, teamDescription, teamStar}: IProjectCard) {

    return (
        <div>
            <div>
                <img src={teamImage} alt="team image"/>
                <div>
                    <div>
                        <h3>{teamName}</h3>
                        <button>
                            <img src="" alt="heart"/>
                        </button>
                    </div>
                    <p>{teamDescription}</p>
                </div>
            </div>
            <div>
                <div>
                    <img src="" alt="star"/>
                    <p>{teamStar}</p>
                </div>
                <div>
                    <button>{teamId} 모임 바로가기</button>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
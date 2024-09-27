import React from 'react';
import { InferSelectModel } from 'drizzle-orm';
import { projects } from '@/db/schema';
import ProjectListDataTable from './table-project';

export type Projects = InferSelectModel<typeof projects>

type Props = {
    projects: Projects[]
}

const ProjectList: React.FC<Props> = ({projects}) => {
    console.log(projects);
    return (
        <div>
            <ProjectListDataTable projects={projects} />
        </div>
    )
}

export default ProjectList;
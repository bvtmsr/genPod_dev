import { IconArrowBackUp  } from "@tabler/icons-react";
import { useProjectOperations } from "src/api/useProjectOperations/useProjectOperations";
import { Project } from "src/store/types";

import { useFlowsStore } from 'src/canvas/store/flowstore';

import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from "src/store/useProjectStore";
import { CustomNode, GroupNode, NodeTypes } from "../store/types.store";
import { getInitialNodesFormData } from "../nodes/utils";
import { getId } from "../utils";
import { useReactFlow } from "reactflow";


interface ProjectParams {
    projectId: string;
}

export default function BacktoCanvas() {

    // const { screenToFlowPosition } = useReactFlow();

    const { getNodesAndEdges, setNodes, addFlow, setEdges } = useFlowsStore();
   
    const param = useParams() as unknown as ProjectParams;


    const selectNode: GroupNode | undefined = getNodesAndEdges().nodes.find(node => node.selected);

    // interface ProjectResponse {
    //     message: string;
    //     project: Project;
    // }
    const { postProject, getProject } = useProjectOperations();
  
    const navigate = useNavigate();
    const setActiveProject = useProjectStore(state => state.setActiveProject);
    //console.log('selectNode', selectNode?.data.linkTo);
    
    const switchCanvasCustomeHandler = (projectId: string) => {

        //  navigate to the project page
        navigate(`/project/${projectId}`);

        //  cath this code from Project  page
        addFlow('flow' + projectId);
    
        setActiveProject(projectId);
        (async function () {
            const { data } = await getProject(projectId);
            if (!data) return;
            const { edges, nodes } = data.flow;
            setNodes(nodes);
            setEdges(edges);
        })();
    }

    const handleOnNestedCanvas = async () => {
        if (selectNode?.data?.linkTo) {
            switchCanvasCustomeHandler(selectNode?.data?.linkTo) 
        }
        
    }
    return (
        <>
            <IconArrowBackUp
                onClick={handleOnNestedCanvas}
                style={{ transition: 'all 0.2s ease' }}
                onMouseEnter={({ target }) => {
                    const element = target as HTMLElement; // Type assertion
                    element.style.cssText = 'transform: scale(1.6); color: var(--mantine-color-orange-5);';
                }}
                onMouseLeave={({ target }) => {
                    const element = target as HTMLElement; // Type assertion
                    element.style.cssText = 'color: #ffffff;';
                    element.style.transform = 'none';
                }}
            />
        </>
    )
}


import { IconArrowForwardUp } from "@tabler/icons-react";
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

export default function AddandOpenNestedCanvas() {
    const { screenToFlowPosition } = useReactFlow();

    const { getNodesAndEdges, setNodes, addFlow, setEdges } = useFlowsStore();

    const param = useParams() as unknown as ProjectParams;


    const selectNode: GroupNode | undefined = getNodesAndEdges().nodes.find(node => node.selected);

    interface ProjectResponse {
        message: string;
        project: Project;
    }
    const { postProject, getProject } = useProjectOperations();
   // const { setActiveProject } = useProjectStore();
    const navigate = useNavigate();
    const setActiveProject = useProjectStore(state => state.setActiveProject);
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
            console.log('selectNode?.data?.linkTo', selectNode);
            switchCanvasCustomeHandler(selectNode?.data?.linkTo)
            return;
        }
        const nodeType = 'microservice' as NodeTypes;
        const position = screenToFlowPosition({
            x: 200,
            y: 200,
        });
        const newNode: CustomNode = {
            id: getId(),
            type: nodeType,
            data: { ...getInitialNodesFormData(nodeType), type: nodeType, name: 'New_Node', linkTo: param.projectId },
            position: position
        };
        const project: Project = {
            id: '',
            name: "canvas_nesting",
            flow: {
                nodes: [newNode],
                edges: []
            }
        }
        const { data } = await postProject(project);

        const pData = typeof data === 'string' ? (JSON.parse(data) as ProjectResponse) : { message: '', project: {} as Project };

        if (pData && pData.project) {
            const updatedNode = getNodesAndEdges().nodes.map(node => {
                if (node.selected) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            linkTo: pData.project.id
                        }
                        //linkTo: pData.project.id
                    }
                }
                return node;
            });
            setNodes(updatedNode);
            switchCanvasCustomeHandler(pData.project.id)
        } else {
            return;
        }
    }
    return (
        <>
            <IconArrowForwardUp
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


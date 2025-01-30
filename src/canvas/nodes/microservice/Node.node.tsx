import classNames from 'classnames';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Handle, NodeProps, Position, NodeToolbar, useStore } from 'reactflow';

import { Flex, Grid, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowForwardUp, IconEdit } from '@tabler/icons-react';

import { useFlowsStore } from '../../store/flowstore';
import { CustomNodeFormData, NodeTypes } from '../../store/types.store';
import NodeDrawer from './Node.drawer';
import classes from './styles.module.css';
// import { get, gt } from 'lodash';

import { MdDelete } from "react-icons/md";
import { GroupNodeData } from '../group-node/GroupNode.types';
import { GrDetach } from "react-icons/gr";

import { useProjectStore } from 'src/store/useProjectStore';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import AddandOpenNestedCanvas from 'src/canvas/components/AddandOpenNestedCanvas';

export default function MicroserviceNode(props: NodeProps<CustomNodeFormData>) {
  const { selected, id } = props;
  const { getNodeFormData, setActiveNode, setGroupNodeFormData, deleteNode, detachNodeFromGroup, addFlow, setNodes, setEdges } = useFlowsStore();
  const [opened, { open, close }] = useDisclosure(false);

  const hasParent = useStore((store) => !!store.nodeInternals.get(id)?.parentNode);


  const parentId: string | undefined = useStore((store) => store.nodeInternals.get(id)?.parentNode);
  const onDetach = () => {


    if (parentId !== undefined)
      deleteChildItem(parentId)

    detachNodeFromGroup([id])


  };


  const deleteChildItem = (itemId: string) => {


    const currentChildren: CustomNodeFormData | undefined = getNodeFormData(itemId);

    if (!currentChildren) return;

    const { children: childData } = currentChildren as GroupNodeData;

    // Check if childData is defined before using it
    if (childData) {
      const updatedChildren: string[] = childData.filter((child) => !id.includes(child));

      setGroupNodeFormData({ ...getNodeFormData(itemId), children: updatedChildren, name: "Sample" }, itemId);
    }

  };



  useEffect(() => {
    if (selected) setActiveNode(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const displayImages = getNodeFormData(id)?.iconName ? (
    <img
      src={`../nodeIcons/${getNodeFormData(id)?.iconName}.png`}
      className=" w-10"
      alt={getNodeFormData(id)?.name}
    />
  ) : (
    <img
      src={`../nodeIcons/sample.png`}
      className=" w-10"
      alt={getNodeFormData(id)?.name}
    />
  );
  const setActiveProject = useProjectStore(state => state.setActiveProject);
  const { getProject } = useProjectOperations();
  const navigate = useNavigate();
  const handleOnLoadedProjectClick = (projectId: string) => {
    setActiveProject(projectId);
    // navigate to the project page
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
    // 
  };

  if (props.type === NodeTypes.MICROSERVICE)
    return (
      <>
        <NodeToolbar className={classes.nodeToolbar}  >
          {/* <button onClick={() => deleteNode(id)} ><MdDelete color='orange' /></button> */}

          {/* <IconTrash onClick={() => deleteNode(id)} />*/}
          <MdDelete onClick={() => deleteNode(id)} className={classes.iconHoverEffect} cursor={"pointer"} title='Delete' />
          {/* <button onClick={onDetach}>Detach</button> */}
          {hasParent && <GrDetach onClick={onDetach} cursor={"pointer"} className={classes.iconHoverEffect} title='Detach' />}
        </NodeToolbar>

        <Handle type="target" position={Position.Right} />
        <Flex
          direction="column"
          justify="flex-start"
          className={classNames(classes['node'], {
            [classes['node_selected']]: selected
          })}
          gap={0}
          h="min-content"
        >
          <Grid className={classes.node__header}>
            <Grid.Col span={5}>
              <Text tt="uppercase" c="orange.5" fw="bold" ta="left">
                {getNodeFormData(id)?.name}
              </Text>
            </Grid.Col>
            <Grid.Col span={3}>{displayImages}</Grid.Col>
            <Grid.Col span={2}>
              <IconEdit
                onClick={() => {
                  open();
                }}
              />
            </Grid.Col>

            <Grid.Col span={2}>
              {/* <Link to={`/node/${id}`}> */}
              <AddandOpenNestedCanvas  />
              {/* </Link> */}
            </Grid.Col>
          </Grid>
          <Grid className={classes.node__body}>
            <Grid.Col span={12}>
              <Text c="white.9" fw="bold" ta="center">
                {getNodeFormData(id)?.description ||
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
              </Text>
            </Grid.Col>
          </Grid>
        </Flex>
        <NodeDrawer opened={opened} close={close} nodeId={id} />
        <Handle type="source" position={Position.Left} id="a" />
      </>
    );

  return null;
}



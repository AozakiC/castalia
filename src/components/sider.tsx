import React, {useEffect, useState} from "react";
import {Box, HStack} from "@chakra-ui/react";
import {H3, RounderBox} from "src/components/primitives";
import {resource, Resource} from "src/server/";
import MenuItem from "./menuItem";


const siderResource: Resource[] = [
    {
        name: "我的",
        site: [],
        icon: "./images/menu/mine.svg"
    },
    ...resource
];

const Sider = () => {
    const [activeResource, setActiveResource] = useState<Resource>(siderResource[0]);

    useEffect(() => {
        const handle = () => {
            for (let i = 0; i < siderResource.length; i++) {
                const target = document.querySelector(`#${siderResource[i].name}`);
                if (target && target.getBoundingClientRect().top >= 0) {
                    setActiveResource(siderResource[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handle);

        return () => {
            window.removeEventListener("scroll", handle);
        }
    }, []);

    return (
        <RounderBox
            position="sticky"
            top="15px"
            backgroundColor="white"
            width="200px"
            textAlign="center"
            paddingTop="50px"
            flexShrink={0}
            display={["none", "inline-block", "inline-block", "inline-block", "inline-block"]}
            height="calc(100vh - 210px)"
        >
            <Box>
                {
                    siderResource.map((item) => (
                        <MenuItem
                            resource={item}
                            key={item.name}
                            active={activeResource.name === item.name}
                        />
                    ))
                }
            </Box>
            <HStack
                position="absolute"
                bottom="15px"
                pl="20px"
                fontSize="16px"
                columnGap="10px"
                cursor="pointer"
                alignItems="center"
            >
                <H3
                    fontWeight="normal"
                    fontSize="14px"
                >
                    <a href="https://github.com/afterwork-design/castalia/">
                        <img
                            src="./github.png"
                            height={20}
                            width={20}
                            alt="github"
                        />
                    </a>
                </H3>
            </HStack>
        </RounderBox>
    );
};

export default Sider;

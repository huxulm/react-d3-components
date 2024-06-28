import type { Meta, StoryObj } from "@storybook/react";
import { Variants } from ".";

const meta = {
  title: "Excises/motion/Varaints",
  parameters: {
    layout: "start",
  },
  tags: ['!autodocs'],
  component: Variants,
} satisfies Meta<typeof Variants>;

export default meta;

export const Default: StoryObj<typeof Variants> = {
  args: {},
  parameters: {
    layout: "fullscreen"
  },
  render: () => {
    return (
      <>
        <style>
          {`
body {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(90deg, rgba(245, 245, 242, 1) 0%, rgba(233, 153, 129, 0.35) 100%);
    overflow: hidden;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  nav {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
  }
  
  .background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    background: #fff;
  }
  
  button {
    outline: none;
    border: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
    position: absolute;
    top: 18px;
    left: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: transparent;
  }
  
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  
  ul {
    padding: 25px;
    position: absolute;
    top: 100px;
    width: 230px;
  }
  
  li {
    list-style: none;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .icon-placeholder {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex: 40px 0;
    margin-right: 20px;
  }
  
  .text-placeholder {
    border-radius: 5px;
    width: 200px;
    height: 20px;
    flex: 1;
  }
  
  .refresh {
    padding: 10px;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }            
          `}
        </style>
        <Variants />
      </>
    );
  },
};

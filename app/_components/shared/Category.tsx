import { Card, CardBody } from "@heroui/card";
import { VariantProps } from "@heroui/theme";
import { ReactNode } from "react";

type TCategoryProps = {
  name: ReactNode;
} & Omit<VariantProps<typeof Card>, "children">;

export default function Category({ name, ...cardProps }: TCategoryProps) {
  return (
    <Card {...cardProps}>
      <CardBody>{name}</CardBody>
    </Card>
  );
}

import {
  IconBriefcase,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBuildingFactory,
  IconCertificate,
  IconCircleCheck,
  IconMapPin,
  IconShieldCheck,
  IconShoppingBag,
  IconUsers,
} from "@tabler/icons-react";
import type { ComponentType, SVGProps } from "react";

const ICONS = {
  "shield-check": IconShieldCheck,
  certificate: IconCertificate,
  users: IconUsers,
  "map-pin": IconMapPin,
  "building-factory": IconBuildingFactory,
  "shopping-bag": IconShoppingBag,
  briefcase: IconBriefcase,
  "brand-facebook": IconBrandFacebook,
  "brand-linkedin": IconBrandLinkedin,
  "brand-instagram": IconBrandInstagram,
  "circle-check": IconCircleCheck,
} as const satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

export type TablerIconName = keyof typeof ICONS;

export interface IconProps {
  name: TablerIconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Component = ICONS[name];
  return <Component className={className} aria-hidden="true" stroke={2} />;
}

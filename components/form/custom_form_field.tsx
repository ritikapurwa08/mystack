import type { Control, FieldValues, FieldPath } from "react-hook-form";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  lucideIcon?: LucideIcon;
  iconAlt?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

const RenderInput = <TFieldValues extends FieldValues = FieldValues>({
  field,
  props,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  props: CustomProps<TFieldValues>;
}) => {
  const IconComponent = props.lucideIcon;

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div
          className={cn(
            "flex items-center rounded-md border border-input bg-background",
            props.containerClassName
          )}
        >
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}

          <FormControl>
            <div className="flex relative w-full">
              <div className="absolute left-1 top-1/2 -translate-y-1/2">
                {IconComponent && (
                  <IconComponent className="ml-2 h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <Input
                placeholder={props.placeholder}
                {...field}
                className={cn(
                  "border-0",
                  props.lucideIcon ? "pl-10 " : "",
                  props.inputClassName
                )}
                disabled={props.disabled}
              />
            </div>
          </FormControl>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className={cn("resize-none", props.inputClassName)}
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div
            className={cn("flex items-center gap-4", props.containerClassName)}
          >
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={props.disabled}
            />
            <label
              htmlFor={props.name}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                props.labelClassName
              )}
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={cn(props.inputClassName)}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{props.children}</SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    default:
      return null;
  }
};

const CustomFormField = <TFieldValues extends FieldValues = FieldValues>(
  props: CustomProps<TFieldValues>
) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex-1", props.className)}>
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className={cn(props.labelClassName)}>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

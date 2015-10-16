# Field and FieldDescriptor

## Field
The `Field` class represents a field value. It is associated (and used by) an instance of the model.

## FieldDescriptor
The `FieldDescriptor` class represents a field meta information. Every `Field` instance has a link to an instance of this class, and instances of this class are referenced by the model class.

At its core, FieldDescriptor contains a minimum amount of information:

* **`name`**. The name of the field. This will be used when creating queries and schemas.
* **`required`**. True if this field is required.
* **`default`**. A default value when the field isn’t set. This can be specified when instanciated, or can be updated, or will revert to not being defined if the field is not `required`, or a default default (ie. empty string for string field descriptors).

This class also contains a number of methods to convert from and to queries, values, etc.

## Specifying Fields in Models
When defining a Model, it is important to either use `FieldDescriptor` instances or `Field` classes. No other

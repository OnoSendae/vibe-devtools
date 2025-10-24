import 'package:flutter/material.dart';

class {{COMPONENT_NAME}} extends StatelessWidget {
  const {{COMPONENT_NAME}}({
    super.key,
    {{PROPS_DEFINITION}}
    this.child,
  });

  {{PROPS_FIELDS}}
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return {{WIDGET_TYPE}}(
      {{WIDGET_PROPS}}
      child: child,
    );
  }
}


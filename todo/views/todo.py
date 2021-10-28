from rest_framework import viewsets

from todo.models import Todo
from todo.serializers.todo import TodoSerializer

class TodoModelViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
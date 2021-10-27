from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

@api_view(['GET'])
def status_check(request):
    """
    서버의 상태를 확인하는 함수
    """
    return Response({
        "status": "OK"
    }, status=status.HTTP_200_OK)
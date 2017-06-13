class Solution:

    def quicksort(self, A):

        def partition(start, end):
            left, right = start, end
            pivot = A[left]
            while left < right:
                while left < right and A[right] >= pivot:
                    right -= 1
                A[left] = A[right]
                while left < right and A[left] <= pivot:
                    left += 1
                A[right] = A[left]
            A[left] = pivot
            return left

        def qs(start, end):
            if start < end:
                pos = partition(start, end)
                qs(start, pos)
                qs(pos+1, end)

        return qs(0, len(A) - 1)

if __name__=='__main__':
    obj = Solution()
    a = [1,5,3,2,8,4,0]
    print obj.quicksort(a)
    print a
